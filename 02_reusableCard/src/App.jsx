import Card from "./components/Card";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8 dark:bg-gray-900">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <h2 className="text-xl font-semibold">Normal Card</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            This card uses normal padding.
          </p>
        </Card>

        <Card padding="small">
          <h2 className="text-xl font-semibold">Small Card</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            This card uses small padding.
          </p>
        </Card>

        <Card padding="large">
          <h2 className="text-xl font-semibold">Large Card</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            This card uses large padding.
          </p>
        </Card>

        <Card padding="none" className="bg-blue-50 dark:bg-blue-950">
          <div className="p-6">
            <h2 className="text-xl font-semibold">Custom Card</h2>
            <p className="mt-2">
              Padding is controlled by the inner element.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}