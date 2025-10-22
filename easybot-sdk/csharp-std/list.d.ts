interface IList<T> {
    readonly Count: number;
    readonly IsReadOnly: boolean;
    get(index: number): T;
    set(index: number, value: T): void;
    Add(item: T): void;
    Clear(): void;
    Contains(item: T): boolean;
    CopyTo(array: T[], arrayIndex: number): void;
    IndexOf(item: T): number;
    Insert(index: number, item: T): void;
    Remove(item: T): boolean;
    RemoveAt(index: number): void;
}

interface IEnumerator<T> {
    Current: T;
    MoveNext(): boolean;
    Reset(): void;
}
