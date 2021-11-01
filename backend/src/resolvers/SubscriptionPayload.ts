import { InterfaceType, Field } from "type-graphql";
import MutationType from "./MutationType";

@InterfaceType()
abstract class SubscriptionPayload {
  @Field((type) => MutationType)
  mutationType: MutationType;
}

export default SubscriptionPayload;
