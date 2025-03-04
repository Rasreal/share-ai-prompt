import { Schema, model, models } from 'mongoose';
import moment from 'moment';
import 'moment/locale/ru'; // Import Russian locale

const PromptSchema = new Schema({
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required'],
    },
    tag: {
        type: String,
        required: [true, 'Tag is required'],
    },
    createdAt: {
        type: String, // Storing as a string to save in Russian format
        default: () => moment().locale('ru').format('LLLL'), // Russian formatted datetime
    },

});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;