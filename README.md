# Cifra de César com Criptoanálise em TypeScript

## Descrição
Este projeto implementa um algoritmo simples da **Cifra de César** para encriptação de textos, usando TypeScript. Além disso, inclui uma **criptoanálise básica** baseada na análise de frequência de letras, que tenta quebrar a cifra automaticamente ao comparar com as frequências esperadas do português.

- **Encriptação**: Desloca letras do alfabeto (A-Z, a-z) por um valor `k` (1 a 25), preservando maiúsculas/minúsculas e caracteres não alfabéticos.
- **Criptoanálise**: Calcula frequências no texto cifrado, testa todos os deslocamentos possíveis e seleciona o que melhor se aproxima das distribuições linguísticas do PT-BR.

## Funcionalidades
- Função `caesarEncrypt(text: string, k: number)`: Encripta o texto.
- Função `frequencyAnalysisAttack(ciphertext: string)`: Decifra automaticamente e retorna o texto provável + deslocamento estimado.

## Como Executar
1. Instale o Node.js e TypeScript: `npm install -g typescript ts-node`.
2. Rode: `ts-node caesar.ts`.

Exemplo de saída:

Texto encriptado: Lelyjíjpv kl Zlnbyhuçh kl Ylklz zviyl h Jpmyh kl Jézhy.
Texto decifrado provável: Exercício de Segurança de Redes sobre a Cifra de César.
Deslocamento estimado: 7

## Dependências
- TypeScript (compilador).
- Node.js (execução).