/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';
const PASSWORD_SIZE = 10;


const Alexa = require('alexa-sdk');
const generator = require('generate-password');

const APP_ID = 'amzn1.ask.skill.98222334-5d07-4411-85c8-9ebd71309be6';

const generatePassword = function(){
    const password = generator.generate({
        length: PASSWORD_SIZE,
        numbers: true
    });

    this.attributes.speechOutput = this.t('RANDOM_PASSWORD_GENERATED', password);

    this.emit(':tell', this.attributes.speechOutput);
};

const handlers = {
    'NewSession': function () {
        generatePassword.apply(this);
    },
    'RandomPasswordIntent': function () {
        generatePassword.apply(this);
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
            HELP_MESSAGE: "You can generate passwords saying, generate random password, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random password, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
            RANDOM_PASSWORD_GENERATED: 'Password generated. The generated password is <say-as interpret-as="spell-out">%s</say-as>.'
        },
    },
    'en-US': {
        translation: {
            SKILL_NAME: 'Random password generator',
            HELP_MESSAGE: "You can generate passwords saying, generate random password, or, you can say exit...Now, what can I help you with?",
            HELP_REPROMT: "You can say things like, generate random password, or you can say exit...Now, what can I help you with?",
            STOP_MESSAGE: 'Goodbye!',
			RANDOM_PASSWORD_GENERATED: 'Password generated. The generated password is <say-as interpret-as="spell-out">%s</say-as>.'
        },
    },
    'de-DE': {
        translation: {
            SKILL_NAME: 'Random password generator',
            HELP_MESSAGE: 'Du kannst beispielsweise Fragen sagen wie Passwort generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            HELP_REPROMT: 'Du kannst beispielsweise Sachen sagen wie Passwort generieren“ oder du kannst „Beenden“ sagen ... Wie kann ich dir helfen?',
            STOP_MESSAGE: 'Auf Wiedersehen!',
			RANDOM_PASSWORD_GENERATED: 'Passwort generiert. Das Passwort lautet: <say-as interpret-as="spell-out">%s</say-as>.'
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
