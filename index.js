/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const PASSWORD_SIZE = 10;


const Alexa = require('alexa-sdk');
const generator = require('generate-password');

const APP_ID = 'amzn1.ask.skill.98222334-5d07-4411-85c8-9ebd71309be6';

const handlers = {
    'NewSession': function () {
        this.attributes.speechOutput = this.t('WELCOME_MESSAGE', this.t('SKILL_NAME'));
  
        this.attributes.repromptSpeech = this.t('WELCOME_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'RandomPasswordIntent': function () {
        const cardTitle = this.t('DISPLAY_CARD_TITLE', this.t('SKILL_NAME'));
        const password = generator.generate({
			length: PASSWORD_SIZE,
			numbers: true
		});

        this.attributes.speechOutput = this.t('RANDOM_PASSWORD_GENERATED');
		this.attributes.repromptSpeech = this.t('RANDOM_NUMER_REPEAT');
		this.emit(':tellWithCard', this.attributes.speechOutput, cardTitle, password);
    },
    'AMAZON.HelpIntent': function () {
        this.attributes.speechOutput = this.t('HELP_MESSAGE');
        this.attributes.repromptSpeech = this.t('HELP_REPROMT');
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.RepeatIntent': function () {
        this.emit(':ask', this.attributes.speechOutput, this.attributes.repromptSpeech);
    },
    'AMAZON.StopIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('SessionEndedRequest');
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

const languageStrings = {
    'en-GB': {
        translation: {
            SKILL_NAME: 'Random password generator',
            WELCOME_MESSAGE: "Welcome to %s. You can say thinks like, „generate new password“.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DISPLAY_CARD_TITLE: '%s  - Generated password.',
            HELP_MESSAGE: "You can generate passwords saying, generate random password, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random password, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
			RANDOM_NUMER_REPEAT: 'Repeat random password',
			RANDOM_PASSWORD_GENERATED: 'Password generated. Please look for it at the Alexa App'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Random password generator',
            WELCOME_MESSAGE: "Welcome to %s. You can say thinks like, „generate new password“.",
            WELCOME_REPROMT: 'For instructions on what you can say, please say help me.',
            DDISPLAY_CARD_TITLE: '%s  - Generated password.',
            HELP_MESSAGE: "You can generate passwords saying, generate random password, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random password, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
			RANDOM_NUMER_REPEAT: 'Repeat random password',
			RANDOM_PASSWORD_GENERATED: 'Password generated. Please look for it at the Alexa App'
        },
    },
    'de-DE': {
        translation: {
            SKILL_NAME: 'Random password generator',
            WELCOME_MESSAGE: 'Willkommen bei %s. Du kannst zum Beispiel „Password generieren“ sagen.',
            WELCOME_REPROMT: 'Wenn du wissen möchtest, was du sagen kannst, sag einfach „Hilf mir“.',
            DISPLAY_CARD_TITLE: '%s - Erzeugte Passwort',
            HELP_MESSAGE: 'Du kannst beispielsweise Fragen sagen wie Passwort generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            HELP_REPROMT: 'Du kannst beispielsweise Sachen sagen wie Passwort generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
			RANDOM_NUMER_REPEAT: 'Passwort wiederholen',
			RANDOM_PASSWORD_GENERATED: 'Passwort generiert. Diese kann in der Alexa App gefunden werden.'
        },
    },
};

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
