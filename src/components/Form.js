import { useRef, useContext, useReducer, useEffect } from "react";
import "../styles/Form.css";
import { Button } from "./Button";
import inputRef from "../Context/inputContext";

const setFormData = (state, action) => {
	if (action.type === "TITLE_INPUT") {
		return {
			...state,
			title: action.value,
		};
	}

	if (action.type === "AMOUNT_INPUT") {
		return {
			...state,
			amount: action.value,
		};
	}

	if (action.type === "DATE_INPUT") {
		return {
			...state,
			date: action.value,
		};
	}
};

const Form = (props) => {
	// const [title, setTitle] = useState("");
	// const [amount, setAmount] = useState("");
	// const [date, setDate] = useState("");

	const [formData, DispatchForm] = useReducer(setFormData, {
		title: "",
		amount: "",
		date: "",
	});

	const context = useContext(inputRef);
	const titleInputRef = useRef("");

	useEffect(() => {
		context.isPressed && titleInputRef.current.focus();
	}, [context.isPressed]);

	const handleTitleChange = (event) => {
		DispatchForm({ type: "TITLE_INPUT", value: event.target.value });
		// const newTitle = event.target.value;
		// setTitle(newTitle);
	};

	const handleAmountChange = (event) => {
		DispatchForm({ type: "AMOUNT_INPUT", value: event.target.value });
		// const newAmount = event.target.value;
		// setAmount(newAmount);
	};

	const handleDateChange = (event) => {
		DispatchForm({ type: "DATE_INPUT", value: event.target.value });
		// const newDate = event.target.value;
		// setDate(newDate);
	};

	const resetForm = () => {
		formData.title = "";
		formData.amount = "";
		formData.date = "";
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		const { title, amount, date } = formData;
		if (title.trim() === "" || amount.trim() === "" || date.trim() === "")
			return;

		const d = new Date(date);
		const locale = navigator.locale;
		const month = d.toLocaleDateString(locale, { month: "long" });
		const day = d.toLocaleDateString(locale, { day: "2-digit" });
		const year = d.toLocaleDateString(locale, { year: "numeric" });
		const finalDate = `${month}/${day}/${year}`;

		const expenseData = {
			title,
			amount,
			date: finalDate,
		};
		resetForm();
		if (event.nativeEvent.submitter.id === "Add") {
			props.submitData(expenseData);
			titleInputRef.current.focus();
		}

		if (event.nativeEvent.submitter.id === "Cancel") {
			resetForm();
			titleInputRef.current.focus();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className="form__controls">
				<label htmlFor="#title" className="form__label">
					Title:
				</label>
				<input
					type="text"
					className="form__input"
					id="title"
					placeholder="title"
					onChange={handleTitleChange}
					value={formData.title}
					ref={titleInputRef}
				/>
			</div>
			<div className="form__controls">
				<label htmlFor="#amount" className="form__label">
					Amount:
				</label>
				<input
					type="number"
					min="1"
					step="0.01"
					className="form__input"
					id="amount"
					placeholder="amount"
					onChange={handleAmountChange}
					value={formData.amount}
				/>
			</div>
			<div className="form__controls">
				<label htmlFor="#date" className="form__label">
					Date:
				</label>
				<input
					type="date"
					className="form__input"
					id="date"
					onChange={handleDateChange}
					value={formData.date}
				/>
			</div>
			<Button name="Add" />
			<Button name="Cancel" />
		</form>
	);
};

export default Form;
