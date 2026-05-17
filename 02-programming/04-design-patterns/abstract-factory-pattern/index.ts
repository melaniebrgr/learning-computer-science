type OperatingSystem = "Windows" | "Web";

interface AppConfig {
	os: OperatingSystem;
}

// The creator class declares the factory method that must
// return an object of a product class. The creator's subclasses
// usually provide the implementation of this method.
abstract class Dialog {
	// The creator may also provide some default implementation
	// of the factory method.
	abstract createButton(): Button;

	// Note that, despite its name, the creator's primary
	// responsibility isn't creating products. It usually
	// contains some core business logic that relies on product
	// objects returned by the factory method.
	render(): void {
		const okButton = this.createButton();
		okButton.onClick(() => this.closeDialog());
		okButton.render();
	}

	protected closeDialog(): void {
		console.log("Dialog closed.");
	}
}

// The product interface declares the operations that all
// concrete products must implement.
interface Button {
	render(): void;
	onClick(handler: () => void): void;
}

// Concrete creators override the factory method to change the
// resulting product's type.
class WindowsDialog extends Dialog {
	createButton(): Button {
		return new WindowsButton();
	}
}

class WebDialog extends Dialog {
	createButton(): Button {
		return new HTMLButton();
	}
}

// Concrete products provide various implementations of the
// product interface.
class WindowsButton implements Button {
	private clickHandler?: () => void;

	render(): void {
		console.log("Render a button in Windows style.");
		this.clickHandler?.();
	}

	onClick(handler: () => void): void {
		this.clickHandler = handler;
	}
}

class HTMLButton implements Button {
	private clickHandler?: () => void;

	render(): void {
		console.log("Render an HTML button.");
		this.clickHandler?.();
	}

	onClick(handler: () => void): void {
		this.clickHandler = handler;
	}
}

class Application {
	private dialog!: Dialog;

	// The application picks a creator's type depending on the
	// current configuration or environment settings.
	initialize(config: AppConfig): void {
		if (config.os === "Windows") {
			this.dialog = new WindowsDialog();
		} else if (config.os === "Web") {
			this.dialog = new WebDialog();
		} else {
			throw new Error("Unknown operating system.");
		}
	}

	// The client code works with an instance of a concrete
	// creator, albeit through its base interface.
	main(config: AppConfig): void {
		this.initialize(config);
		this.dialog.render();
	}
}

function readApplicationConfigFile(): AppConfig {
	return { os: "Web" };
}

const app = new Application();
app.main(readApplicationConfigFile());