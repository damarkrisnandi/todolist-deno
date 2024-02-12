import { useSignal } from "@preact/signals";
import Counter from "../islands/Counter.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import InputSubmit from "../islands/InputSubmit.tsx";
import { saveTodo, allTodo } from "../database/index.ts";
export const handler: Handlers<[string, string][]> = {
  async GET(_, ctx) {
    const todo = await allTodo();
    console.log(todo);
    return ctx.render(todo);
  },
  async POST(req) {
    const form = await req.formData();
    const content = form.get("content");

    if (typeof content !== "string" || !content || content.length === 0) {
      return new Response("Invalid Content", { status: 400 });
    }
    const id = await saveTodo(content);
    return new Response("", {
      status: 302,
      headers: {
        Location: `/`,
      },
    });
  },
};

export default function Home(props: PageProps<[string, string][]>) {
  // const count = useSignal(3);

  return (
    <div class="px-4 py-8 mx-auto bg-[#86efac] h-screen">
      <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
        {/* <img */}
        {/*   class="my-6" */}
        {/*   src="/logo.svg" */}
        {/*   width="128" */}
        {/*   height="128" */}
        {/*   alt="the Fresh logo: a sliced lemon dripping with juice" */}
        {/* /> */}
        <h1 class="text-4xl font-bold">TodoList</h1>
        <p class="text-sm text-fuchsia-700">Agenda Hari ini?</p>

        <form action={"/"} method={"post"} class="flex mt-3">
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
        <ul>
          {props.data.map(([id, content]) => (
            <li class="w-64 p-4 m-2 bg-teal-600 text-white rounded flex justify-between">
              <div class="font-semibold">{content}</div>
              <div>
                <a href={`/${id}`} class="text-white hover:text-fuchsia-400">
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
                      d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                </a>
              </div>{" "}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
