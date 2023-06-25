import Link from "next/link";
import { siteConfig } from "@/app/site-config";
import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import Balancer from "react-wrap-balancer";

export default function IndexPage() {
  return (
    <section className="container flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center gap-6 overflow-hidden pb-8 pt-6 md:py-10">
      <div className="max-w-5xl space-y-8">
        <h1
          className="animate-fade-up bg-gradient-to-br from-foreground/80 to-muted-foreground bg-clip-text text-center font-cal text-5xl/[3rem] font-bold text-transparent opacity-0 drop-shadow-sm md:text-7xl/[5rem]"
          style={{ animationDelay: "0.20s", animationFillMode: "forwards" }}
        >
          <Balancer>{siteConfig.name}</Balancer>
        </h1>
        <p
          className="animate-fade-up text-center text-muted-foreground/80 opacity-0 md:text-xl"
          style={{ animationDelay: "0.30s", animationFillMode: "forwards" }}
        >
          <Balancer>{siteConfig.description}</Balancer>
        </p>
        <div
          className="flex animate-fade-up justify-center gap-4 opacity-0"
          style={{ animationDelay: "0.40s", animationFillMode: "forwards" }}
        >
          <Link
            href={siteConfig.links.docs}
            className={buttonVariants({ size: "lg" })}
          >
            Documentation
          </Link>
          <Link
            target="_blank"
            rel="noreferrer"
            href={siteConfig.links.github}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            <Icons.gitHub className="mr-1 h-4 w-4" />
            GitHub
          </Link>
        </div>
      </div>
    </section>
  );
}
