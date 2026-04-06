export default function Officers() {
  const officers = [
    { name: "Nicholas Matias", role: "President", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Diego Landeata Torres", role: "Vice-President", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Axel Fontaine", role: "Treasurer", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Adam Vasquez", role: "Secretary", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Steven Zapata", role: "Communications Chair", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Romina Cruz", role: "Membership Chair", likes: "This", dislikes: "That", hobbies: "The Other" },
    { name: "Muhammed Wadiala", role: "Outreach Chair", likes: "This", dislikes: "That", hobbies: "The Other" },
  ];

  return (
    <section id="officers" className="w-full bg-[#500000]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-stretch">

          <div className="h-[600px] overflow-y-auto pr-4 space-y-6">
            {officers.map((o) => (
              <div key={o.name} className="flex justify-between bg-[#FAF3E0] p-6 shadow-lg">
                <div>
                  <h3 className="text-2xl font-semibold text-[#000000]">{o.name}</h3>
                  <p className="uppercase tracking-wide text-sm text-[#000000]/70">{o.role}</p>

                  <div className="mt-4 text-[#000000] space-y-1">
                    <p>Likes: {o.likes}</p>
                    <p>Dislikes: {o.dislikes}</p>
                    <p>Hobbies: {o.hobbies}</p>
                  </div>
                </div>

                <div className="ml-6 h-28 w-24 bg-[#000000]" />
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-center text-[#FFFFFF]">
            <h2 className="text-4xl font-semibold underline underline-offset-8">Our Officers</h2>

            <p className="mt-8 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi pretium tellus duis convallis. Tempus leo eu aenean sed diam urna tempor.
            </p>

            <p className="mt-6 leading-relaxed">
              Pulvinar vivamus fringilla lacus nec metus bibendum egestas. Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent per conubia nostra inceptos himenaeos.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}