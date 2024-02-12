import { Handlers, PageProps } from "$fresh/server.ts";
import { getTodo, editTodo } from "../../database/index.ts";
export const handler: Handlers = {
  async GET(_, ctx) {
    const id = ctx.params.id;
    const content: string | null = await getTodo(id);
    if (!content) {
      return ctx.renderNotFound();
    }
    return ctx.render(content);
  },

  async POST(req, ctx) {
    console.log("on edit", ctx);
    const id = ctx.params.id;
    const form = await req.formData();
    const content = form.get("content");

    if (typeof content !== "string" || !content || content.length === 0) {
      return new Response("Invalid Content", { status: 400 });
    }
    const resp = await editTodo(id, content);
    if (!resp) {
      return new Response("Data Not Found", { status: 400, headers: {} });
    }
    return new Response("", {
      status: 302,
      headers: {
        Location: "/",
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
        <h1 class="text-4xl font-bold">Update TodoList</h1>
        <p class="text-sm text-fuchsia-700"></p>
        <div class="w-64 p-4 m-2 bg-teal-600 rounded flex justify-between flex-col">
          <div class="text-sm text-white">id: {props.params.id}</div>
          <div class="font-semibold text-white">Old Todo: {props.data}</div>
          <form action={`${props.params.id}`} method={"post"} class="flex mt-3">
            <input
              type="text"
              name="content"
              class="p-2 w-11/12 rounded-l mr-1"
            ></input>
            <button
              type="submit"
              class="bg-fuchsia-800 text-white text-sm px-4 rounded-r hover:bg-fuchsia-400 hover:text-gray-600"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </form>
        </div>
        <div class="flex justify-end mr-1">
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
