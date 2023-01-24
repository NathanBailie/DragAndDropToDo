import 'normalize.css';
import './app.scss';
import { useState } from 'react';
import uuid from 'react-uuid';


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
						>
							<p>{title}</p>
						</div>
					)
				})}
			</div>
		);
	});

	return (
		<div className="app">
			{result}
		</div>
	);
};

export default App;
