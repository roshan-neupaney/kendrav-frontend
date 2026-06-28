// Shim for sveltekit-superforms' typebox adapter barrel import.
// We only use the zod4 adapter; this prevents the barrel from crashing.
export class Base {
	Check(_value) { return false; }
	Errors(_value) { return []; }
	Create() { return undefined; }
}
export default { Base };
