import 'normalize.css';
import './app.scss';
import { useState } from 'react';
import uuid from 'react-uuid';
import { Board, Task } from '../interfaces';


const App: React.FC = () => {
	const allData = [
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
	const [data, setData] = useState(allData);
	const [currentBoard, setCurrentBoard] = useState<Board>();
	const [currentTask, setCurrentTask] = useState<Task>();

	const result = data.map(board => {
		const { title, id, items } = board;
		let titleClasses = 'app__title';
		if (title === 'Запланировано') {
			titleClasses += ' app__title_planned';
		} else if (title === 'В процессе') {
			titleClasses += ' app__title_inProcess';
		} else if (title === 'Выполнено') {
			titleClasses += ' app__title_finished';
		};

		return (
			<div
				className='app__board'
				key={id}
				id={id}
			>
				<h2 className={titleClasses}>{title}</h2>
				{items.map(task => {
					const { title, id } = task;
					return (
						<div
							className="app__task"
							key={id}
							id={id}
							onDragStart={(e) => onDragStart(e, board, task)}
							onDragOver={(e) => onDragOver(e)}
							onDragLeave={(e) => onDragLeave(e)}
							onDrop={(e) => onDrop(e, board, task)}
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
		const closest = e.target.closest('.app__task');
		closest.style.borderBottom = '4px solid LimeGreen'
	};

	function onDragLeave(e: any): void {
		const closest = e.target.closest('.app__task');
		closest.style.borderBottom = 'none';
	};

	function onDrop(e: any, board: Board, task: Task): void {
		e.preventDefault();
		const targetTask = e.target.closest('.app__task');
		targetTask.style.borderBottom = 'none';

		if (currentTask) {
			if (task.id === currentTask.id) {
				return;
			};

			const filteredData = data.map(box => {
				const newItems = box.items.filter(item => item.id !== currentTask.id);
				return { ...box, ['items']: newItems }
			});
			const filteredBoardItems = board.items.filter(item => item.id !== currentTask.id);
			const dropIndex = filteredBoardItems.findIndex(item => item.id === task.id) + 1;
			const newBoard = { ...board, ['items']: [...filteredBoardItems.slice(0, dropIndex), currentTask, ...filteredBoardItems.slice(dropIndex)] };
			const newData = filteredData.map(item => {
				if (item.id !== newBoard.id) {
					return item;
				} else {
					return newBoard;
				};
			});
			setData(newData);
		};
	};


	return (
		<div className="app">
			{result}
		</div>
	);
};

export default App;
