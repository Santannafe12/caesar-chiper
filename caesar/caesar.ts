// 1) Implementação da Cifra de César (apenas encriptação)
// Esta função encripta uma string usando a Cifra de César com um deslocamento k.
// Ela preserva maiúsculas/minúsculas e ignora caracteres não alfabéticos.
// O alfabeto considerado é o latino (A-Z), com 26 letras.

function caesarEncrypt(text: string, k: number): string {
    k = k % 26;
    if (k < 0) k += 26;

    let result = '';
    for (let char of text) {
        if (char >= 'A' && char <= 'Z') {
            // Maiúsculas
            result += String.fromCharCode(((char.charCodeAt(0) - 65 + k) % 26) + 65);
        } else if (char >= 'a' && char <= 'z') {
            // Minúsculas
            result += String.fromCharCode(((char.charCodeAt(0) - 97 + k) % 26) + 97);
        } else {
            // Outros caracteres permanecem iguais
            result += char;
        }
    }
    return result;
}

// Exemplo de uso:
console.log(caesarEncrypt("Hello, World!", 3)); // Saída: "Khoor, Zruog!"
console.log(caesarEncrypt("Ataque ao amanhecer", 5)); // Saída: "Fyfzvj ft frfsmjhjw"

// 2) Criptoanálise baseada na ocorrência de letras (análise de frequência)
// Tenta todos os deslocamentos possíveis (0-25) e escolhe o que minimiza a diferença quadrática com as frequências esperadas.
// Retorna o texto decifrado provável e o deslocamento estimado.

const expectedFreqPT: { [key: string]: number } = {
    'a': 0.1463, 'b': 0.0104, 'c': 0.0388, 'd': 0.0499, 'e': 0.1257,
    'f': 0.0102, 'g': 0.0101, 'h': 0.0078, 'i': 0.0618, 'j': 0.0040,
    'k': 0.0002, 'l': 0.0278, 'm': 0.0473, 'n': 0.0505, 'o': 0.0973,
    'p': 0.0252, 'q': 0.0120, 'r': 0.0653, 's': 0.0681, 't': 0.0434,
    'u': 0.0463, 'v': 0.0167, 'w': 0.0001, 'x': 0.0021, 'y': 0.0001, 'z': 0.0047
};

function calculateFrequency(text: string): { [key: string]: number } {
    const freq: { [key: string]: number } = {};
    let totalLetters = 0;
    for (let char of text.toLowerCase()) {
        if (char >= 'a' && char <= 'z') {
            freq[char] = (freq[char] || 0) + 1;
            totalLetters++;
        }
    }
    for (let key in freq) {
        freq[key] /= totalLetters;
    }
    return freq;
}

function chiSquaredDistance(observed: { [key: string]: number }, expected: { [key: string]: number }): number {
    let distance = 0;
    for (let letter = 'a'; letter <= 'z'; letter = String.fromCharCode(letter.charCodeAt(0) + 1)) {
        const obs = observed[letter] || 0;
        const exp = expected[letter] || 0;
        if (exp > 0) {
            distance += Math.pow(obs - exp, 2) / exp;
        }
    }
    return distance;
}

function caesarDecrypt(text: string, k: number): string {
    // Decriptação é encriptação com -k
    return caesarEncrypt(text, -k);
}

function frequencyAnalysisAttack(ciphertext: string): { decrypted: string, shift: number } {
    let bestShift = 0;
    let minDistance = Infinity;
    let bestDecrypted = '';

    for (let shift = 0; shift < 26; shift++) {
        const candidate = caesarDecrypt(ciphertext, shift);
        const freq = calculateFrequency(candidate);
        const distance = chiSquaredDistance(freq, expectedFreqPT);
        if (distance < minDistance) {
            minDistance = distance;
            bestShift = shift;
            bestDecrypted = candidate;
        }
    }

    return { decrypted: bestDecrypted, shift: bestShift };
}

// Encriptando um texto para testar o ataque
const original = "Exercício de Segurança de Redes sobre a Cifra de César.";
const encrypted = caesarEncrypt(original, 7);
console.log("Texto encriptado:", encrypted);

// Atacando o texto encriptado
const result = frequencyAnalysisAttack(encrypted);
console.log("Texto decifrado provável:", result.decrypted);
console.log("Deslocamento estimado:", result.shift);