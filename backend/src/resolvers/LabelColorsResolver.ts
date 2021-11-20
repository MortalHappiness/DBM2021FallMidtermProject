import "reflect-metadata";
import { Query, Resolver } from "type-graphql";

export const labelColors = {
  DEFAULT: "rgba(206, 205, 202, 0.5)",
  GRAY: "rgba(155, 154, 151, 0.4)",
  BROWN: "rgba(140, 46, 0, 0.2)",
  ORANGE: "rgba(245, 93, 0, 0.2)",
  YELLOW: "rgba(233, 168, 0, 0.2)",
  GREEN: "rgba(0, 135, 107, 0.2)",
  BLUE: "rgba(0, 120, 223, 0.2)",
  PURPLE: "rgba(103, 36, 222, 0.2)",
  PINK: "rgba(221, 0, 129, 0.2)",
  RED: "rgba(255, 0, 26, 0.2)",
};

@Resolver()
class LabelColorsResolver {
  @Query((returns) => String)
  labelColors() {
    return JSON.stringify(labelColors);
  }
}

export default LabelColorsResolver;
