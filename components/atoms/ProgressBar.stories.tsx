/**
 * ProgressBar Atom Stories
 *
 * Linear progress indicator with determinate and indeterminate states.
 */

import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ProgressBar } from './ProgressBar';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const meta = {
  title: 'Atoms/ProgressBar',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Linear progress indicator for tasks. Track: gray-200 rounded-full. Fill: blue-600 rounded-full. Sizes: sm (4px), md (8px), lg (12px). Transition: 300ms smooth. Supports determinate (0-100%) and indeterminate (animated sweep). Accessibility: role="progressbar", proper ARIA attributes.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    value: {
      control: 'number',
      description: 'Progress value (0-100)',
    },
    max: {
      control: 'number',
      description: 'Maximum value',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress bar height',
    },
    indeterminate: {
      control: 'boolean',
      description: 'Indeterminate loading state',
    },
    label: {
      control: 'text',
      description: 'Accessible label',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show label text below bar',
    },
  },
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story 1: Default
export const Default: Story = {
  args: {
    value: 45,
    size: 'md',
  },
  render: (args) => (
    <div className="w-96 p-8">
      <ProgressBar {...args} />
    </div>
  ),
};

// Story 2: All Sizes
export const AllSizes: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-96 p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Small (4px)</p>
        <ProgressBar size="sm" value={60} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Medium (8px) [Default]</p>
        <ProgressBar size="md" value={60} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Large (12px)</p>
        <ProgressBar size="lg" value={60} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Three sizes: sm (4px), md (8px), lg (12px) height. All use rounded-full (pill shape).',
      },
    },
  },
};

// Story 3: Progress States
export const ProgressStates: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-96 p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">0% (Starting)</p>
        <ProgressBar value={0} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">25%</p>
        <ProgressBar value={25} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">50% (Halfway)</p>
        <ProgressBar value={50} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">75%</p>
        <ProgressBar value={75} />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">100% (Complete)</p>
        <ProgressBar value={100} />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress from 0% to 100%. Width transitions smoothly with 300ms duration.',
      },
    },
  },
};

// Story 4: Indeterminate
export const Indeterminate: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-96 p-8 space-y-8">
      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Indeterminate (Unknown duration)</p>
        <ProgressBar indeterminate size="md" />
        <p className="text-xs text-gray-600 mt-2">Animated sweep for unknown duration tasks</p>
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Small indeterminate</p>
        <ProgressBar indeterminate size="sm" />
      </div>

      <div>
        <p className="text-sm font-medium text-gray-700 mb-2">Large indeterminate</p>
        <ProgressBar indeterminate size="lg" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Indeterminate state with animated sweep. Use when progress duration is unknown.',
      },
    },
  },
};

// Story 5: With Labels
export const WithLabels: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-96 p-8 space-y-8">
      <div>
        <ProgressBar
          value={45}
          label="Uploading file"
          showLabel
        />
      </div>

      <div>
        <ProgressBar
          value={73}
          label="Processing images"
          showLabel
        />
      </div>

      <div>
        <ProgressBar
          value={100}
          label="Upload complete"
          showLabel
        />
      </div>

      <div>
        <ProgressBar
          indeterminate
          label="Analyzing content"
          showLabel
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Progress bars with descriptive labels. Percentage automatically appended for determinate progress.',
      },
    },
  },
};

// Story 6: Animated Progress
export const AnimatedProgress: Story = {
  args: { value: 50 },
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0; // Reset to loop
          return prev + 1;
        });
      }, 100);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-96 p-8">
        <ProgressBar
          value={progress}
          label="Loading"
          showLabel
        />
        <p className="text-xs text-gray-600 mt-4">
          Progress automatically increments to demonstrate smooth transitions
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Live demo of smooth width transitions. Progress increments every 100ms.',
      },
    },
  },
};

// Story 7: Upload Progress
export const UploadProgress: Story = {
  args: { value: 50 },
  render: () => {
    const [uploadProgress, setUploadProgress] = useState(0);
    const [isUploading, setIsUploading] = useState(false);

    const startUpload = () => {
      setIsUploading(true);
      setUploadProgress(0);

      const interval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setIsUploading(false), 500);
            return 100;
          }
          return prev + 5;
        });
      }, 150);
    };

    return (
      <div className="w-96 p-8">
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h4 className="text-base font-semibold text-gray-900 mb-4">
            File Upload
          </h4>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-700">resume.pdf</span>
              <span className="text-sm text-gray-600">2.4 MB</span>
            </div>
            <ProgressBar
              value={uploadProgress}
              label="Uploading"
              showLabel={isUploading}
            />
          </div>

          <button
            onClick={startUpload}
            disabled={isUploading}
            className="w-full h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? 'Uploading...' : uploadProgress === 100 ? 'Upload Complete' : 'Start Upload'}
          </button>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Realistic file upload scenario with animated progress. Click to start upload.',
      },
    },
  },
};

// Story 8: Multi-step Process
export const MultiStepProcess: Story = {
  args: { value: 50 },
  render: () => {
    const [step, setStep] = useState(1);
    const totalSteps = 4;
    const progress = (step / totalSteps) * 100;

    const steps = [
      { num: 1, label: 'Personal Info' },
      { num: 2, label: 'Project Details' },
      { num: 3, label: 'Budget & Timeline' },
      { num: 4, label: 'Review & Submit' },
    ];

    return (
      <div className="w-full max-w-2xl p-8">
        <div className="bg-white border border-gray-200 rounded-md p-6">
          <h4 className="text-base font-semibold text-gray-900 mb-2">
            Project Inquiry Form
          </h4>
          <p className="text-sm text-gray-600 mb-6">
            Step {step} of {totalSteps}
          </p>

          <ProgressBar value={progress} size="md" className="mb-6" />

          {/* Steps */}
          <div className="grid grid-cols-4 gap-2 mb-8">
            {steps.map((s) => (
              <div
                key={s.num}
                className={cn(
                  "text-center p-3 rounded-md text-xs transition-colors duration-150",
                  s.num <= step
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "bg-gray-100 text-gray-500"
                )}
              >
                {s.label}
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex gap-3">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="flex-1 h-10 px-4 bg-white border border-gray-300 text-gray-900 rounded-md font-medium hover:bg-gray-50 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => setStep(Math.min(totalSteps, step + 1))}
              disabled={step === totalSteps}
              className="flex-1 h-10 px-4 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition-colors duration-150 ease-out disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === totalSteps ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Multi-step form with progress indicator. Progress updates as user navigates steps.',
      },
    },
  },
};

// Story 9: Download Progress
export const DownloadProgress: Story = {
  args: { value: 50 },
  render: () => (
    <div className="w-96 p-8 space-y-6">
      <div className="bg-white border border-gray-200 rounded-md p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Resume_2024.pdf</p>
            <p className="text-xs text-gray-600">Downloading...</p>
          </div>
          <span className="text-xs font-medium text-blue-600">67%</span>
        </div>
        <ProgressBar value={67} size="sm" />
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Portfolio_Images.zip</p>
            <p className="text-xs text-gray-600">Preparing download...</p>
          </div>
        </div>
        <ProgressBar indeterminate size="sm" />
      </div>

      <div className="bg-white border border-gray-200 rounded-md p-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">Case_Study.pdf</p>
            <p className="text-xs text-gold-600">Complete</p>
          </div>
          <span className="text-xs font-medium text-gold-600">100%</span>
        </div>
        <ProgressBar value={100} size="sm" className="bg-gold-200" />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Download progress for multiple files with different states (downloading, preparing, complete).',
      },
    },
  },
};

// Story 10: Page Loading
export const PageLoading: Story = {
  args: { value: 50 },
  render: () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className="w-full max-w-4xl">
        <ProgressBar
          value={progress}
          size="sm"
          className="fixed top-0 left-0 right-0 rounded-none"
        />
        <div className="p-8 mt-8">
          <div className="bg-gray-100 p-6 rounded-md text-center">
            <p className="text-sm text-gray-700">
              Page loading progress: {progress}%
            </p>
            <p className="text-xs text-gray-600 mt-2">
              Fixed to top of viewport (common pattern for page loads)
            </p>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Page loading indicator fixed to top of viewport. Common pattern for route transitions.',
      },
    },
  },
};

// Story 11: Accessibility Demo
export const AccessibilityDemo: Story = {
  args: { value: 50 },
  render: () => (
    <div className="max-w-2xl p-8 space-y-8">
      <div className="bg-gray-100 p-6 rounded-md">
        <h4 className="text-base font-semibold text-gray-900 mb-4">Accessibility Features</h4>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>✅ <strong>role="progressbar"</strong> - Semantic HTML for screen readers</li>
          <li>✅ <strong>aria-valuenow</strong> - Current progress value announced</li>
          <li>✅ <strong>aria-valuemin/max</strong> - Range announced (0-100)</li>
          <li>✅ <strong>aria-label</strong> - Describes what's loading</li>
          <li>✅ <strong>aria-busy</strong> - Set to true for indeterminate state</li>
          <li>✅ <strong>Reduced motion</strong> - Respects prefers-reduced-motion (future enhancement)</li>
        </ul>
      </div>

      <div className="bg-white border border-gray-200 p-6 rounded-md space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Determinate Progress</h4>
          <ProgressBar
            value={65}
            label="Uploading images to server"
            showLabel
          />
          <p className="text-xs text-gray-600 mt-2">
            Screen readers announce: "Uploading images to server, 65%"
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-900 mb-3">Indeterminate Progress</h4>
          <ProgressBar
            indeterminate
            label="Processing your request"
            showLabel
          />
          <p className="text-xs text-gray-600 mt-2">
            Screen readers announce: "Processing your request, busy"
          </p>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features including ARIA attributes and screen reader announcements.',
      },
    },
  },
};

// Story 12: Interactive (Playground)
export const Interactive: Story = {
  args: {
    value: 50,
    max: 100,
    size: 'md',
    indeterminate: false,
    label: 'Loading...',
    showLabel: false,
  },
  render: (args) => (
    <div className="w-96 p-8">
      <ProgressBar {...args} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground - use controls to test value, size, indeterminate state, and labels.',
      },
    },
  },
};
