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
            required: 'Responda à questão'
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
            { correct === true && <Text style={[styles.correctBar, styles.status]}>Exercício respondido: correto!</Text>}
            { correct === false && <Text style={[styles.wrongBar, styles.status]}>Exercício respondido: errado!</Text>}
            { answered && <Text style={[styles.textCorrectAnswer]}>Resposta correta abaixo: </Text>}
            <Text style={styles.blockType}>{`Exercício: ${type}`}</Text>
            {type === 'texto' && (
                <>
                    <Text style={styles.textSubTitle}>{content.question}</Text>
                    <TextInput
                        defaultValue={getValues('answer')}
                        placeholder="Resposta"
                        style={[
                            styles.singleLineInput,
                            answered && styles.correct,
                        ]}
                        onChangeText={(text) => {
                            setValue('answer', text);
                        }}
                        editable={!answered}
                    />
                    { errors.answer && <Text style={styles.textSubTitle, styles.wrongText}>
                        { errors.answer?.message }
                    </Text> }
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
                </>
            )}
            {!answered && !validating && 
                <TouchableOpacity
                    style={styles.submitButton}
                    onPress={handleSubmit(({ answer }) =>
                        // checkAnswerAlt(answer)
                        submitAnswer(answer)
                    )}
                    disabled={answered || validating}
                >
                    <Text style={styles.submitButtonText}>Submeter</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    block: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        backgroundColor: '#fff',
        padding: 30,
        borderRadius: 10,
        shadowColor: '#00000021',
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 12,
    },
    submitButton: {
        backgroundColor: '#40739e',
        marginTop: 20,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        alignSelf: 'stretch'
    },
    submitButtonText: {
        color: '#fff'
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
        paddingHorizontal: 15,
        paddingVertical: 5,
        marginBottom: 20,
        borderRadius: 100
    },
    correct: {
        borderWidth: 2,
        borderColor: '#6a6'
    },    
    correctBar: {
        backgroundColor: '#6a6',
        color: '#fff',
    },
    wrongBar: {
        backgroundColor: '#d66',
        color: '#fff',
    },
    wrongText: {
        color: '#d66',
        marginTop: 8
    },
    singleLineInput: {
        marginTop: 10,
        padding: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
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
    },
    textSubTitle: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 15,
        marginTop: 5
    },
    textCorrectAnswer: {
        textAlign: 'left',
        alignSelf: 'stretch',
        fontSize: 15,
        marginBottom: 10,
    }
});

export default Exercise;
