import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ wireframe: string }>;
}

const wireframes = ["design-1", "design-2", "design-3"];

export default async function WireframePage({ params }: PageProps) {
  const { wireframe } = await params;

  if (!wireframes.includes(wireframe)) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl p-8 text-center">
        <h1 className="text-4xl font-bold text-[#020202] mb-8">
          {wireframe.charAt(0).toUpperCase() +
            wireframe.slice(1).replace("-", " ")}
        </h1>
        <div className="bg-[#F5F5F5] rounded-xl p-8">
          <p className="text-xl text-[#020202]">
            This is the {wireframe} wireframe page.
          </p>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  return wireframes.map((wireframe) => ({
    wireframe,
  }));
}
