// Biblioteca para assinatura digital
const canvas = document.getElementById('assinaturaCanvas');
const signaturePad = new SignaturePad(canvas);

document.getElementById('salvarAssinatura').addEventListener('click', () => {
    if (signaturePad.isEmpty()) {
        alert('Por favor, forneça uma assinatura.');
    } else {
        const assinatura = signaturePad.toDataURL();
        adicionarAssinatura(guiaId, assinatura);
    }
});