import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { useForm } from 'react-hook-form';
import RadioButton from '../../../components/RadioButton';

function Exercise({ content, type }) {
    const { register, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
    const [answered, setAnswered] = useState(undefined);
    useEffect(() => {
        register('answer', {
            required: 'Responda a questão'
        });
    }, [register]);

    const checkAnswerText = (ans) => {
        if (ans === content.answer) setAnswered(true);
        else setAnswered(false);
    };

    const checkAnswerAlt = (ans) => {
        if (Number(ans) === Number(content.answerNumber)) setAnswered(true);
        else setAnswered(false);
    };

    const watchAnswer = watch('answer');

    return (
        <View style={styles.block}>
            <Text style={styles.blockType}>{`Exercício: ${type}`}</Text>
            {type === 'texto' && (
                <>
                    <Text style={styles.textSubTitle}>{content.question}</Text>
                    <TextInput
                        defaultValue={getValues('answer')}
                        placeholder="Resposta"
                        style={[
                            answered === false && styles.wrong,
                            answered === true && styles.correct,
                            styles.singleLineInput
                        ]}
                        onChangeText={(text) => {
                            setValue('answer', text);
                        }}
                        editable={answered === undefined}
                    />
                    { errors.answer && <Text style={styles.textSubTitle, styles.wrongText}>
                        { errors.answer?.message }
                    </Text> }
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(({ answer }) =>
                            checkAnswerText(answer)
                        )}
                        disabled={answered !== undefined}
                    >
                        <Text>Submeter</Text>
                    </TouchableOpacity>
                </>
            )}
            {type === 'alternativa' && (
                <>
                    <Text style={styles.textSubTitle}>{content.question}</Text>
                    {content.alternatives.map((alternative, index) => 
                        <TouchableOpacity
                            style={styles.alternative}
                            onPress={() => setValue('answer', index)}
                            disabled={answered !== undefined}
                            key={index}
                        >
                            <RadioButton color={ watchAnswer === index ? (answered === true ? '#6a6' : (answered === undefined ? '#000' : '#a66')) : (answered === undefined ? '#000' : '#aaa')} selected={watchAnswer === index}/>
                            <Text style={{marginLeft: 5}}>{alternative.text}</Text>
                        </TouchableOpacity>
                    )}
                    { errors.answer && <Text style={styles.textSubTitle, styles.wrongText}>
                        { errors.answer?.message }
                    </Text> }
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(({ answer }) =>
                            checkAnswerAlt(answer)
                        )}
                        disabled={answered !== undefined}
                    >
                        <Text>Submeter</Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        flex: 1,
        width: Dimensions.get('window').width - 60,
        alignItems: 'center',
        margin: 30,
        marginTop: 0,
        padding: 20,
        borderColor: '#54a0ff',
        borderWidth: 2,
        borderRadius: 3,
        backgroundColor: '#e7f1ff'
    },
    submitButton: {
        backgroundColor: '#54a0ff',
        marginTop: 10,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 3,
        alignSelf: 'stretch'
        //elevation: 2
    },
    alternative: {
        marginTop: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'stretch'
        //elevation: 2
    },
    correct: {
        backgroundColor: '#afa',
        borderWidth: 2,
        borderColor: '#6a6'
    },
    wrong: {
        backgroundColor: '#faa',
        borderWidth: 2,
        borderColor: '#a66'
    },
    wrongText: {
        color: '#e22',
        marginTop: 8
    },
    singleLineInput: {
        marginTop: 10,
        padding: 8,
        backgroundColor: 'white',
        //elevation: 2,
        borderRadius: 3,
        alignSelf: 'stretch'
    },
    blockType: {
        fontSize: 20,
        textAlign: 'left',
        flex: 1,
        alignSelf: 'stretch',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        marginBottom: 5
    },
    videoContainer: {
        width: Dimensions.get('window').width - 106,
        height: ((Dimensions.get('window').width - 106) * 9) / 16
    },
    infoImage: {
        alignSelf: 'stretch',
        aspectRatio: 1
    },
    textSubTitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 15,
        marginTop: 5
    }
});

export default Exercise;
