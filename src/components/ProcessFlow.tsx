import { useState } from 'react';

interface Step {
    id: string;
    title: string;
    description: string;
    icon: string;
    position: 'top' | 'bottom';
    example: string;
}

const steps: Step[] = [
    {
        id: 'prompt',
        title: 'User Prompt',
        description: 'I describe what I want to build or fix',
        icon: '💭',
        position: 'top',
        example: '"Let\'s add a theme switcher to change the website\'s appearance"'
    },
    {
        id: 'analysis',
        title: 'AI Analysis',
        description: 'Claude analyzes the request and existing codebase',
        icon: '🤔',
        position: 'bottom',
        example: 'Analyzing current theme implementation, checking for CSS variables, considering accessibility requirements...'
    },
    {
        id: 'suggestion',
        title: 'Code Suggestion',
        description: 'Claude suggests code changes and explains the approach',
        icon: '💡',
        position: 'top',
        example: 'Let\'s create a ThemeSwitcher component using React. We\'ll need to:\n1. Define theme options\n2. Add CSS variables\n3. Handle theme persistence'
    },
    {
        id: 'review',
        title: 'Review & Refine',
        description: 'I review the changes and request adjustments if needed',
        icon: '👀',
        position: 'bottom',
        example: '"The dark theme looks good, but can we make the terminal theme more authentic?"'
    },
    {
        id: 'implement',
        title: 'Implementation',
        description: 'The code is implemented and tested',
        icon: '✅',
        position: 'top',
        example: 'Changes applied! The theme switcher is now working with all requested adjustments.'
    }
];

export default function ProcessFlow() {
    const [activeStep, setActiveStep] = useState<string | null>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleStepClick = (stepId: string) => {
        if (isAnimating) return;

        setIsAnimating(true);

        // Find current and target indices
        const currentIndex = activeStep ? steps.findIndex(step => step.id === activeStep) : -1;
        const targetIndex = steps.findIndex(step => step.id === stepId);

        // Determine which steps to animate through
        const stepsToAnimate = steps.slice(
            currentIndex + 1,
            targetIndex + 1
        );

        // If clicking backwards, reset to the target directly
        if (currentIndex > targetIndex) {
            setActiveStep(stepId);
            setIsAnimating(false);
            return;
        }

        // Animate through the steps
        stepsToAnimate.forEach((step, index) => {
            setTimeout(() => {
                setActiveStep(step.id);
                if (index === stepsToAnimate.length - 1) {
                    setIsAnimating(false);
                }
            }, index * 500);
        });
    };

    const activeStepData = steps.find(step => step.id === activeStep);

    return (
        <div className="relative py-20 mx-auto max-w-4xl">
            {/* Example Display - Made sticky */}
            <div
                className={`
                    sticky top-4 mb-8 z-10
                    transition-all duration-300
                    ${activeStep ? 'opacity-100' : 'opacity-0'}
                `}
            >
                {activeStepData && (
                    <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-lg">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="text-2xl">{activeStepData.icon}</span>
                            <h4 className="text-lg font-semibold text-gray-900">{activeStepData.title}</h4>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap">
                            {activeStepData.example}
                        </div>
                    </div>
                )}
            </div>

            {/* Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-200 via-purple-500 to-purple-200" />

            {/* Steps */}
            <div className="relative">
                {steps.map((step, index) => (
                    <div
                        key={step.id}
                        className={`flex items-center gap-4 mb-16 ${step.position === 'top' ? 'flex-row' : 'flex-row-reverse'
                            }`}
                    >
                        {/* Content */}
                        <div
                            className={`flex-1 ${step.position === 'top' ? 'text-right' : 'text-left'
                                }`}
                        >
                            <button
                                onClick={() => handleStepClick(step.id)}
                                className={`group inline-block text-left ${step.position === 'top' ? 'text-right' : 'text-left'
                                    }`}
                            >
                                <div className="text-2xl mb-1">{step.icon}</div>
                                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                                    {step.title}
                                </h3>
                                <p className="text-gray-600 max-w-xs">
                                    {step.description}
                                </p>
                            </button>
                        </div>

                        {/* Connection Point */}
                        <div className="relative">
                            <div
                                className={`w-6 h-6 rounded-full border-4 transition-all duration-300 ${activeStep === step.id
                                    ? 'border-purple-600 bg-white scale-125'
                                    : 'border-purple-200 bg-white'
                                    }`}
                            />
                        </div>

                        {/* Spacer for opposite side */}
                        <div className="flex-1" />
                    </div>
                ))}
            </div>
        </div>
    );
} 