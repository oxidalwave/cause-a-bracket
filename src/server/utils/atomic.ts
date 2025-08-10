type AtomicOptions = {
  allowMultipleAtoms?: boolean;
};

class AtomicEmptyError extends Error {
  constructor() {
    super("Expected a single atom, but none exist.");
    this.name = "AtomicEmptyError";
  }
}

class AtomicMultipleAtomsError<TAtom> extends Error {
  array: TAtom[];

  constructor(array: TAtom[]) {
    super("Expected a single atom, but multiple atoms exist.");
    this.name = "AtomicMultipleAtomsError";
    this.array = array;
  }
}

export default async function atomic<TAtom>(
  array: (TAtom | undefined)[] | Promise<(TAtom | undefined)[]>,
  opts?: AtomicOptions,
): Promise<TAtom> {
  const atoms = await array;
  if (opts?.allowMultipleAtoms === false && atoms.length > 1) {
    throw new AtomicMultipleAtomsError(atoms);
  }
  const [inserted] = atoms;
  if (inserted === undefined) {
    throw new AtomicEmptyError();
  }
  return inserted;
}
