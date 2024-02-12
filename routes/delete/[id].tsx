import { Handlers, PageProps } from "$fresh/server.ts";
import { getTodo, deleteTodo } from "../../database/index.ts";
export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const content: string | null = await getTodo(id);
    if (!content) {
      return ctx.renderNotFound();
    }
    return ctx.render(content);
  },

  async POST(_, ctx) {
    console.log(ctx);
    const id = ctx.params.id;
    const resp = await deleteTodo(id);
    return new Response("", {
      status: 302,
      headers: {
        Location: resp,
      },
    });
  },
};

export default function Home(props: PageProps<string>) {
  // const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac] h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        <img
          class="my-6"
          src="/logo.svg"
          width="128"
          height="128"
          alt="the Fresh logo: a sliced lemon dripping with juice"
        />
        <h1 class="text-4xl font-bold">Delete TodoList</h1>
        <p class="text-sm text-fuchsia-700"></p>
        <div class="w-64 p-4 m-2 bg-teal-600 text-white rounded flex justify-between">
          <div class="">
            Are you sure to delete Todo <p class="text-xl">{props.data}</p> (id:{" "}
            {props.params.id}) ?
          </div>
        </div>
        <div class="flex justify-end mr-1">
          <form action={props.params.id} method="post" id={"delete"}>
            <button
              type="submit"
              class="bg-fuchsia-800 text-white text-sm px-4 py-4 rounded hover:bg-fuchsia-400 hover:text-gray-600 mr-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
            </button>
          </form>
          <a
            href={`/${props.params.id}`}
            class="bg-fuchsia-800 text-white text-sm px-4 py-4 rounded hover:bg-fuchsia-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
