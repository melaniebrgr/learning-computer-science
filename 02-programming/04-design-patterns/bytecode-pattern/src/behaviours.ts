export function getHealth(wizard: number) {
  console.log(`Getting wizard ${wizard} health of 69`);
  return 69;
}

export function setHealth(wizard: number, amount: number) {
  console.log(`Setting wizard ${wizard} health to ${amount}`);
}

export function setWisdom(wizard: number, amount: number) {
  console.log(`Setting wizard ${wizard} wisdom to ${amount}`);
}

export function setAgility(wizard: number, amount: number) {
  console.log(`Setting wizard ${wizard} agility to ${amount}`);
}

export function playSound(id: number) {
  console.log(`Playing sound ${id}`);
}

export function spawnParticles(id: number) {
  console.log(`Spawning particles of type ${id}`);
}