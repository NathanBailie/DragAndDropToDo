import 'normalize.css';
import './app.scss';
import { useState } from 'react';
import uuid from 'react-uuid';

interface Board {
	title: string,
	id: string,
	items: Task[] | [],
};

type Task = {
	title: string,
	id: string,
};


const App: React.FC = () => {
	const data = [
		{
			title: 'Запланировано', id: uuid(), items: [
				{ title: 'Задача 1', id: uuid() },
				{ title: 'Задача 2', id: uuid() },
				{ title: 'Задача 3', id: uuid() },
			],
		},
		{
			title: 'В процессе', id: uuid(), items: [
				{ title: 'Задача 4', id: uuid() },
				{ title: 'Задача 5', id: uuid() },
			],
		},
		{
			title: 'Выполнено', id: uuid(), items: [
				{ title: 'Задача 6', id: uuid() },
			],
		},
	];
	const [tasks, setTasks] = useState(data);
	const [currentBoard, setCurrentBoard] = useState({});
	const [currentTask, setCurrentTask] = useState({});

	const result = tasks.map(board => {
		const { title, id, items } = board;
		return (
			<div
				className='app__board'
				key={id}
			>
				<h2>{title}</h2>
				{items.map(task => {
					const { title, id } = task;
					return (
						<div
							className="app__task"
							key={id}
							onDragStart={(e) => onDragStart(e, board, task)}
							onDragOver={(e) => onDragOver(e)}
							onDragLeave={(e) => onDragLeave(e)}
							onDragEnd={(e) => onDragEnd(e)}
							onDrop={(e) => onDrop(e)}
							draggable="true"
						>
							<p>{title}</p>
						</div>
					)
				})}
			</div>
		);
	});

	function onDragStart(e: any, board: Board, task: Task): void {
		setCurrentBoard(board);
		setCurrentTask(task);
	};

	function onDragOver(e: any): void {
		e.preventDefault();
		let closest = e.target.closest('.app__task');
		closest.style.boxShadow = '0px 0px 4px 1px LimeGreen'
	};

	function onDragLeave(e: any): void {
		let closest = e.target.closest('.app__task');
		closest.style.boxShadow = 'none';
	};

	function onDragEnd(e: any): void {

	};

	function onDrop(e: any): void {
		e.preventDefault();
		let closest = e.target.closest('.app__task');
		closest.style.boxShadow = 'none';
	};


	return (
		<div className="app">
			{result}
		</div>
	);
};

export default App;
