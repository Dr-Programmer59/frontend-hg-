import PopularStreamCarousel from "@/components/popular-stream-carousel";
import {
  FamousArtists,
  HGVibeLiveCTA,
  StreamerBanner,
  CallToAction,
  CreativeProductShowcase,
} from "@/components";
import LiveStreamHero from "./live-stream-hero/page";
import PricingCards from "./plans/page";
import WhyUs from "./why-us/page";
export default function Home() {

  return (
    <div className="">
      <LiveStreamHero />
      <WhyUs />
      {/* <div className="px-12 md:px-8 sm:px-0 xs:px-0 bg-background"> */}
      <StreamerBanner />
      <PopularStreamCarousel />

      {/* </div> */}
      <FamousArtists />
      <CreativeProductShowcase />
      <HGVibeLiveCTA />
      <CallToAction />
      <PricingCards />
    </div>
  );
}
