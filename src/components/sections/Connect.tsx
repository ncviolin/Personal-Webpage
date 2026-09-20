import { personal } from "../../data/personal";
import { SectionHeader } from "../ui/SectionHeader";
import { SocialLinkCard } from "../ui/SocialLink";

export function Connect() {
  return (
    <section
      id="connect"
      className="py-24 md:py-32 px-6 md:px-10"
      style={{ backgroundColor: "#141414" }}
      aria-labelledby="connect-heading"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          label="Follow Along"
          heading="Connect"
          description="Stay up to date with performances, recordings, and behind-the-scenes moments."
          light
        />

        <div
          className="grid gap-6"
          style={{
            gridTemplateColumns: `repeat(auto-fit, minmax(220px, 1fr))`,
          }}
        >
          {personal.social.map((s) => (
            <SocialLinkCard key={s.platform} social={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
