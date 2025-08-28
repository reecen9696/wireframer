import { notFound } from "next/navigation";
import { wireframes } from "../../data/wireframes";
import { Div } from "../../components/Div";

interface Props {
  params: { wireframe: string };
}

export default async function WireframePage({ params }: Props) {
  const wireframeParam = await params.wireframe;
  const wireframeName = wireframes.find(
    (wf) => wf.name.replace(/\s+/g, "-").toLowerCase() === wireframeParam
  )?.name;

  if (!wireframeName) return notFound();

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans flex flex-col items-center py-10">
      <Div className="w-full max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4 text-[#020202]">
          {wireframeName}
        </h2>
        <p className="text-lg text-[#020202]">
          Wireframe layout for {wireframeName} goes here.
        </p>
      </Div>
    </div>
  );
}
