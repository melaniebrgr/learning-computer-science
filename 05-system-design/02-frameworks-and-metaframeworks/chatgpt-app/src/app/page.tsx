
type Params = { slug: undefined }
type SearchParams = { [key: string]: string | string[] | undefined }

interface LandingRouteProps {
  params: Params;
  searchParams: SearchParams;
}

export default async function LandingRoute(props: LandingRouteProps) {
  const params = await props.params
  const searchParams = await props.searchParams
  console.log(
    "LandingRoute",
    params,
    searchParams
  );
  return (
    <main className="p-5">
      <h1 className="text-4xl font-bold">Welcome To GPT Chat</h1>
    </main>
  );
}