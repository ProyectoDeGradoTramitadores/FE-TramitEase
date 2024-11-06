import axios from 'axios';
import { Message } from '../../../entities/Message';
import { SendMessageResponse } from '../../../entities/SendMessageResponse';

const api = axios.create({
    baseURL: 'http://localhost:5137/api/Messages'
});

export const sendWhatsAppMessage = async (request: Message): Promise<SendMessageResponse> => {
    const response = await api.post<SendMessageResponse>('/send', request);
    return response.data;
};
