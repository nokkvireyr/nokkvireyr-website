import { FadeIn } from "@components/fadeIn";
import style from '@styles/contact/contact.module.scss';
import { useEffect, useState } from "react";
import { PageLayout } from "./page";
const reg = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

interface iError {
    error: boolean,
    message: string
}

export const ContactPage = () => {

    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [sending, setSending]  = useState<boolean>(false);


    const [error, setError] = useState<undefined|string>();
    const [errors, setErrros] = useState<{name: iError, email: iError, message: iError}>({
        name: {
            error: false,
            message: '',
        },
        email: {
            error: false,
            message: ''
        },
        message: {
            error: false,
            message: ''
        }
    });

    const [showError, setShowError] = useState<boolean>(false);

    const onSubmit = async (e:any) => {
        e.preventDefault();
        setSending(true);
        let error = false;
        let new_errors = {
            name: {
                error: false,
                message: ''
            },
            email: {
                error: false,
                message: ''
            },
            message: {
                error: false,
                message: ''
            }
        }
        if(name == undefined || name == '') {
            // setError('Name is required');
            new_errors.name.error = true;
            new_errors.name.message = 'Name is required';
            error = true;
        }
        if(email == undefined || email == '') {
            // setError('Email is required');
            new_errors.email.error = true;
            new_errors.email.message = 'Email is required';  
            error = true;      
        }
        if(message == undefined || message == '') {
            // setError('Message is required');
            new_errors.message.error = true;
            new_errors.message.message = 'Message is required';  
            error = true;     
        }
        if(reg.test(email) == false) {
            // setError('Invalid email');
            new_errors.email.error = true;
            new_errors.email.message = 'Invalid email';  
            error = true;  
        }

        if(error) {
            setErrros(new_errors);
            setSending(false);
            return;
        }

        const res = await fetch('/api/mail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                message
            })
        });

        const json = await res.json();
        if(json.error == true) {
            setError(json.message);
        } else {
            setName(''); setMessage(''); setEmail(''); setErrros({name: {error: false, message: ''}, email: {error: false, message: ''}, message: {error: false, message: ''}});
            error = false;
        }
        setSending(false);
    }

    useEffect(() => {
        if(errors.email.error == true || errors.name.error == true || errors.message.error == true || error != undefined) {
            let timeout = setTimeout(() => {
                setError(undefined);
                setErrros({name: {error: false, message: ''}, email: {error: false, message: ''}, message: {error: false, message: ''}});
            }, 4000);
            return () => clearTimeout(timeout);
        }
    }, [errors, errors.email.error, errors.name.error, errors.message.error, error]);


    return (<>
        {(errors.email.error == true || errors.name.error == true || errors.message.error == true || error) ? <div className={style.error} key={errors + ''}>
            {errors.name.error && <span>{errors.name.message}</span>}
            {errors.email.error && <span>{errors.email.message}</span>}
            {errors.message.error && <span>{errors.message.message}</span>}
            {error && <span>{error}</span>}
        </div> : null}
        <PageLayout id="#contact" className=" !min-h-fit">
            <FadeIn down={true} >
                
                <form onSubmit={onSubmit}>
                    <div className={` text-4xl font-bold text-dark-text-300 mb-4 mt-12 lg:mt-0`}>
                        <span>Contact Me</span>
                    </div>
                    <div className={style.contact_parent}>
                        <div className={style.input_element}>
                            <label htmlFor="name" className={style.label}>Name*</label>
                            <div className={style.input_error_label}>
                                {errors.name.error && errors.name.message}
                            </div>
                            <input className={`${style.input} ${errors.name.error == true ? style.input_error : null}`} type="text" placeholder="Name" name="name" id="name" onChange={(e) => setName(e.currentTarget.value)} value={name}/>
                        </div>
                    </div>
                    <div className={style.contact_parent}>
                        <div className={style.input_element}>
                            <label htmlFor="email" className={style.label}>Email*</label>
                            <div className={style.input_error_label}>
                                {errors.email.error && errors.email.message}
                            </div>
                            <input className={`${style.input} ${errors.email.error == true ? style.input_error : null}`} type="email" placeholder="Email" name="email" id="email" onChange={(e) => setEmail(e.currentTarget.value)} value={email}/>
                        </div>
                    </div>
                    <div className={style.contact_parent}>
                        <div className={style.input_element}>
                            <label htmlFor="text" className={style.label}>Message*</label>
                            <div className={style.input_error_label}>
                                {errors.message.error && errors.message.message}
                            </div>
                            <textarea className={`${style.input} ${errors.message.error == true ? style.input_error : null}`} placeholder="Message" name="text" id="text" rows={10} style={{
                                resize: "none"
                            }} onChange={(e) => setMessage(e.currentTarget.value)} value={message} />
                        </div>
                    </div>
                    {!sending && <div className={style.contact_parent}>
                        <div className={style.input_element}>
                            <button type="submit" className={`${style.button} ${sending ? style.button_disabled : null}`} disabled={sending}>
                                Send
                            </button>
                        </div>
                    </div>}
                </form>
            </FadeIn>
        </PageLayout></>
    )

}