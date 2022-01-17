import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from 'react-native';
import { set, useForm } from 'react-hook-form';
import RadioButton from '../../../components/RadioButton';
import { getAuth } from '@firebase/auth';
import axios from 'axios';

function Exercise({ content, type, savedState }) {
    const { register, handleSubmit, setValue, getValues, formState: { errors }, watch } = useForm();
    const [answered, setAnswered] = useState(false);
    const [validating, setValidating] = useState(false);
    const [correct, setCorrect] = useState(undefined);

    const rightAnswer = content?.type === 'texto' ? content?.answer : content?.type === 'alternativa' ? Number(content?.answerNumber) : '';
    
    useEffect(() => {
        register('answer', {
            required: 'Responda a questão'
        });
    }, [register]);

    useEffect(() => {
        if (savedState !== undefined) {
            setValue('answer', rightAnswer);
            setAnswered(true);
            setCorrect(savedState);
        }

    }, [savedState])

    const submitAnswer = async (ans) => {
        setValidating(true);
        const auth = getAuth();
        
        const token = await auth.currentUser?.getIdToken();
        axios
            .post(`http://192.168.0.29:8000/exploration/${content?.id}/submit`,
            {
                answer: ans
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then((res) => {
                setValue('answer', rightAnswer);
                setCorrect(res.data?.correct);
                setAnswered(true);
                setValidating(false);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    const watchAnswer = watch('answer');

    return (
        <View style={styles.block}>
            { correct === true && <Text style={[styles.correct, styles.status]}>Exercício respondido: correto!</Text>}
            { correct === false && <Text style={[styles.wrong, styles.status]}>Exercício respondido: errado!</Text>}
            { answered && <Text style={[styles.textSubTitle]}>Resposta correta abaixo: </Text>}
            <Text style={styles.blockType}>{`Exercício: ${type}`}</Text>
            {type === 'texto' && (
                <>
                    <Text style={styles.textSubTitle}>{content.question}</Text>
                    <TextInput
                        defaultValue={getValues('answer')}
                        placeholder="Resposta"
                        style={[
                            answered && styles.correct,
                            styles.singleLineInput
                        ]}
                        onChangeText={(text) => {
                            setValue('answer', text);
                        }}
                        editable={!answered}
                    />
                    { errors.answer && <Text style={styles.textSubTitle, styles.wrongText}>
                        { errors.answer?.message }
                    </Text> }
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(({ answer }) =>
                            submitAnswer(answer)
                        )}
                        disabled={answered || validating}
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
                            disabled={answered}
                            key={index}
                        >
                            {/* watchAnswer === index ? (answered === true ? '#6a6' : (answered === undefined ? '#000' : '#a66')) : (answered === undefined ? '#000' : '#aaa') */}
                            <RadioButton 
                                color={answered ? (watchAnswer === index ? '#6a6' : '#aaa'): '#000'} 
                                selected={watchAnswer === index}
                            />
                            <Text style={{marginLeft: 5}}>{alternative.text}</Text>
                        </TouchableOpacity>
                    )}
                    { errors.answer && <Text style={styles.textSubTitle, styles.wrongText}>
                        { errors.answer?.message }
                    </Text> }
                    <TouchableOpacity
                        style={styles.submitButton}
                        onPress={handleSubmit(({ answer }) =>
                            // checkAnswerAlt(answer)
                            submitAnswer(answer)
                        )}
                        disabled={answered || validating}
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
    status: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginBottom: 5,
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
        marginBottom: 5,
        paddingTop: 10
    },
    textSubTitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 15,
        marginTop: 5
    }
});

export default Exercise;
