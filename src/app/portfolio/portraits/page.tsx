import { redirect } from "next/navigation";

export default function PortraitsPortfolioPage() {
	redirect("/portfolio?category=portraits");
}
