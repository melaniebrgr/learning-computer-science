type UUID = `${string}-${string}-${string}-${string}-${string}`;

const uuid: () => UUID = () => crypto.randomUUID();

export { type UUID, uuid }