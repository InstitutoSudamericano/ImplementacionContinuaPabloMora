const API_URL = 'http://localhost:3000';

async function main() {
  console.log('1. Creando Usuario A (Pablo)...');
  const userARes = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Pablo (Simulado)',
      edad: 25,
      email: 'pablo_simulado_' + Date.now() + '@test.com',
      password: 'password123',
      biografia: 'Me encanta programar',
      genero: 'M',
      fotos: ['http://foto1.jpg'],
    }),
  });
  const userA = await userARes.json();
  if (!userARes.ok) return console.error('Error creando Usuario A', userA);

  console.log('2. Creando Usuario B (Ana)...');
  const userBRes = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nombre: 'Ana (Simulada)',
      edad: 23,
      email: 'ana_simulada_' + Date.now() + '@test.com',
      password: 'password123',
      biografia: 'Buscando alguien divertido',
      genero: 'F',
      fotos: ['http://foto2.jpg'],
    }),
  });
  const userB = await userBRes.json();
  if (!userBRes.ok) return console.error('Error creando Usuario B', userB);

  console.log('3. Pablo le da LIKE a Ana...');
  await fetch(`${API_URL}/interactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromUserId: userA.id, toUserId: userB.id, type: 'LIKE' }),
  });

  console.log('4. Ana le da LIKE a Pablo (Genera MATCH)...');
  const matchRes = await fetch(`${API_URL}/interactions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fromUserId: userB.id, toUserId: userA.id, type: 'LIKE' }),
  });
  const matchData = await matchRes.json();
  const matchId = matchData.match.id;

  console.log('5. Creando Chat para el Match...');
  const chatRes = await fetch(`${API_URL}/chats`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ matchId }),
  });
  const chatData = await chatRes.json();
  const chatId = chatData.id;

  console.log('6. Simulando Conversación...');
  // Pablo dice Hola Ana
  await fetch(`${API_URL}/chats/${chatId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId: userA.id, content: 'Hola Ana' }),
  });

  // Ana dice Hola Pablo como estas
  await fetch(`${API_URL}/chats/${chatId}/messages`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId: userB.id, content: 'Hola Pablo como estas' }),
  });

  console.log('\n======================================');
  console.log('¡Simulación completada! Ve a Postman y haz un GET a:');
  console.log(`${API_URL}/matches/user/${userA.id}`);
  console.log('======================================\n');
}

main().catch(console.error);
