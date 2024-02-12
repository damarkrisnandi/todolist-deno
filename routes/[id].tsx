import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import InputSubmit from "../islands/InputSubmit.tsx";
import { getTodo, deleteTodo } from "../database/index.ts";
export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const content: any = await getTodo(id);
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
        <h1 class="text-4xl font-bold">TodoList</h1>
        <p class="text-sm text-fuchsia-700">id: {props.params.id}</p>
        <div class="w-64 p-4 m-2 bg-teal-600 text-white rounded flex justify-between">
          <div class="font-semibold">{props.data}</div>
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
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </button>
          </form>
          <a
            href="/"
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
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
          </a>
        </div>

        {/* <p class="my-4"> */}
        {/*   Try updating this message in the */}
        {/*   <code class="mx-2">./routes/index.tsx</code> file, and refresh. */}
        {/* </p> */}
        {/* <Counter count={count} /> */}
      </div>
    </div>
  );
}
