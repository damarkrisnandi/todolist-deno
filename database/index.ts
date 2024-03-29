const kv = await Deno.openKv();

export function saveTodo(content: string): Promise<string> {
  return saveKV("todo", content);
}

export function getTodo(id: string): Promise<string | null> {
  return getKV("todo", id);
}

export function allTodo(): Promise<[string, string][]> {
  return getAllKV("todo");
}

export function deleteTodo(id: string): Promise<string> {
  return deleteKV("todo", id);
}

export function editTodo(id: string, value: string): Promise<string | null> {
  return editKV("todo", id, value);
}

// main methods

function generateId(): string {
  return Math.random().toString(36).slice(2);
}

async function saveKV(prefix: string, value: string): Promise<string> {
  const id = generateId();
  await kv.set([prefix, id], value);
  return id;
}

async function editKV(
  prefix: string,
  id: string,
  value: string,
): Promise<string | null> {
  const content: any = await kv.get([prefix, id]);
  if (!content) {
    return null;
  }
  await kv.set([prefix, id], value);
  return id;
}
async function deleteKV(prefix: string, id: string): Promise<string> {
  console.log(prefix, id);
  await kv.delete([prefix, id]);
  return "/";
}
async function getKV(prefix: string, id: string): Promise<string | null> {
  const res: any = await kv.get([prefix, id]);
  return res.value;
}

export async function getAllKV(prefix: string): Promise<[string, string][]> {
  const returns: [string, string][] = [];
  for await (const { key, value } of kv.list<string>(
    { prefix: [prefix] },
    {
      limit: 30,
    },
  )) {
    console.log(key, value);
    // kv.delete(["todo", key[1]]);
    returns.push([key[1] as string, value]);
  }

  return returns;
}
