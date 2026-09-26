
import { redirect } from "next/navigation";

export default function OldNHIECreatePage() {
  redirect("/nhie?create=1");
}