"use client";

import { Check } from "lucide-react";

export type StepStatus = "complete" | "current" | "upcoming";

export interface Step {
  id: string;
  name: string;
  description?: string;
  status: StepStatus;
  href?: string;
}

interface StepsProps {
  steps: Step[];
  className?: string;
}

export function Steps({ steps, className }: StepsProps) {
  return (
    <nav aria-label="Progress" className={className}>
      <ol
        role="list"
        className="divide-y divide-border rounded-md border border-border md:flex md:divide-y-0"
      >
        {steps.map((step, stepIdx) => (
          <li key={step.id} className="relative md:flex md:flex-1">
            <StepItem step={step} />

            {stepIdx !== steps.length - 1 && (
              <div
                aria-hidden="true"
                className="absolute top-0 right-0 hidden h-full w-5 md:block"
              >
                <svg
                  fill="none"
                  viewBox="0 0 22 80"
                  preserveAspectRatio="none"
                  className="size-full text-border"
                >
                  <path
                    d="M0 -2L20 40L0 82"
                    stroke="currentColor"
                    vectorEffect="non-scaling-stroke"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

function StepItem({ step }: { step: Step }) {
  const Wrapper = step.href ? "a" : "div";
  const wrapperProps = step.href ? { href: step.href } : {};

  if (step.status === "complete") {
    return (
      <Wrapper
        {...wrapperProps}
        className="group flex w-full items-center"
      >
        <span className="flex items-center px-6 py-4 text-sm font-medium">
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary group-hover:bg-primary/80 transition-colors">
            <Check aria-hidden="true" className="size-6 text-primary-foreground" />
          </span>
          <span className="ml-4 text-sm font-medium text-foreground">
            {step.name}
          </span>
        </span>
      </Wrapper>
    );
  }

  if (step.status === "current") {
    return (
      <Wrapper
        {...wrapperProps}
        aria-current="step"
        className="flex items-center px-6 py-4 text-sm font-medium"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-primary">
          <span className="text-primary font-semibold">{step.id}</span>
        </span>
        <span className="ml-4 text-sm font-medium text-primary">
          {step.name}
        </span>
      </Wrapper>
    );
  }

  // upcoming
  return (
    <Wrapper
      {...wrapperProps}
      className="group flex items-center"
    >
      <span className="flex items-center px-6 py-4 text-sm font-medium">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-muted-foreground/30 group-hover:border-muted-foreground/50 transition-colors">
          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
            {step.id}
          </span>
        </span>
        <span className="ml-4 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
          {step.name}
        </span>
      </span>
    </Wrapper>
  );
}
