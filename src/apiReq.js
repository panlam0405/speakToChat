import { Configuration, OpenAIApi } from "openai";
import { synth, voices } from "./main";

const configuration = new Configuration({
	organization: "org-2zUXztWSzyCkiThKfsJDfe7f",
	apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function runCompletion(text) {
	const gtpResponse = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: text }],
	});
	const { choices } = await gtpResponse.data;

	const response = choices[0]?.message?.content;

	console.log(response);
	readMessage(response);
}

function setVoices() {
	if (voices.length === 0) {
		alert("Sorry, it seems this browser does not support different voices.");
		// voiceSelect.remove();
	}

	// for (let i = 0; i < voices.length; i++) {
	// 	const option = document.createElement("option");
	// 	option.textContent = `${voices[i].name} (${voices[i].lang})`;

	// 	if (voices[i].default) {
	// 		option.textContent += " — DEFAULT";
	// 	}

	// 	option.setAttribute("data-lang", voices[i].lang);
	// 	option.setAttribute("data-name", voices[i].name);
	// 	voiceSelect.appendChild(option);
	// }
}

// function getSelectedVoice() {
// 	const option = voiceSelect.selectedOptions[0];
// 	return voices.find((voice) => voice.name === option.dataset.name);
// }

function readMessage(message) {
	const msg = new SpeechSynthesisUtterance();
	msg.text = message;
	msg.lang = document.getElementById("lang").value;
	// msg.voice = getSelectedVoice();
	synth.speak(msg);
}
