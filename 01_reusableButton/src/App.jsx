import Button from "./components/Button";
import Button1 from "./components/Button1";

const App = () => {
  return (
    <div className="flex gap-4 p-10">
      
      <div>
      <Button>Click Me</Button>

      <Button variant="secondary">
        Secondary
      </Button>

      <Button variant="outline" size="lg">
        Learn More
      </Button>

      <Button variant="danger" size="sm">
        Delete
      </Button>

      <Button variant="ghost">
        Cancel
      </Button>

      </div>
    
      <div>
        

// Basic
<Button>Click me</Button>

// Variants
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Delete</Button>

// Sizes
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>

// Loading state (shows spinner + disables)
<Button loading>Saving...</Button>

// Disabled
<Button disabled>Can't click</Button>

// Custom extra classes
<Button className="w-full shadow-xl mt-4">Full width</Button>

// Render as a link
<Button as="a" href="/dashboard">Go to Dashboard</Button>

// With an icon
<Button>
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
  Add Item
</Button>
      </div>

    </div>
    
  );
};

export default App;