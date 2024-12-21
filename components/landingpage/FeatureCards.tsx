import { Code, Trophy, Users } from "lucide-react";
import React from "react";
import { Card, CardHeader, CardContent, CardDescription } from "../ui/card";

const FeatureCards = () => {
  return (
    <section className="mb-12" aria-labelledby="features-heading">
      <h2 id="features-heading" className="sr-only">
        Features
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        <FeatureCard
          icon={<Code className="w-12 h-12" />}
          title="Problem Solving"
          description="View your solved problems across all difficulty levels"
        />
        <FeatureCard
          icon={<Trophy className="w-12 h-12" />}
          title="Contest Performance"
          description="Track your contest rating and ranking progress"
        />
        <FeatureCard
          icon={<Users className="w-12 h-12" />}
          title="Community Standing"
          description="See how you stack up against other LeetCoders"
        />
      </div>
    </section>
  );
};

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card>
      <CardHeader className="pb-3">{icon}</CardHeader>
      <CardContent>
        <h3 className="text-xl font-semibold mb-1">{title}</h3>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

export default FeatureCards;
