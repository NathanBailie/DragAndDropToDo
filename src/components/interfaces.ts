export interface Board extends Task {
	items: Task[] | [],
};

export interface Task {
	title: string,
	id: string,
};