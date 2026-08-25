import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "V-Shape Workout Tracker",
    short_name: "V-Shape",
    description: "Dumbbell + floor + bodyweight workout tracker",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#111111",
    icons: [],
  };
}
