import path from 'path';
import fs from 'fs';
import config from './config';
import trie from './trie';

const file = path.join(__dirname, config.dictionary.sowpods);
const dictionary = {
  init(callback) {
    if(!fs.existsSync(file)) {
      return callback(`Error: File does not exist: ${file}`);
    }

    fs.readFile(file, 'utf8', (err, dict) => {
      if(err) {
        return callback(err);
      }

      const words = dict.split('\n');
      const wordList = trie.init(words);

      if(callback && typeof callback === 'function') {
        return callback(null, wordList);
      }
      return wordList;
    });
  }
}

export default dictionary;
