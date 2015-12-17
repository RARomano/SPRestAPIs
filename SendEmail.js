/// Configurações do email

function processarEmails() {

    var from = 'email@dominio.com.br',
        to = 'email@dominio.com.br',
        body = 'Conteudo',
        subject = 'assunto do email';

    sendEmail(from, to, body, subject);
}

/// Envia o email
function sendEmail(from, to, body, subject) {    
    var siteurl = _spPageContextInfo.webServerRelativeUrl;
    var urlTemplate = siteurl + "/_api/SP.Utilities.Utility.SendEmail";
    $.ajax({
        contentType: 'application/json',
        url: urlTemplate,
        type: "POST",
        data: JSON.stringify({
            'properties': {
                '__metadata': {
                    'type': 'SP.Utilities.EmailProperties'
                },
                'From': from,
                'To': {
                    'results': [to]
                },
                'Body': body,
                'Subject': subject
            }
        }),
        headers: {
            "Accept": "application/json;odata=verbose",
            "content-type": "application/json;odata=verbose",
            "X-RequestDigest": $("#__REQUESTDIGEST").val()
        },
        success: function(data) {
            alert('Email enviado');
        },
        error: function(err) {
            alert('Erro enviando E-mail: ' + JSON.stringify(err));
        }
    });
}

/// Executa as funções
$(document).ready(function () {

    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', processarEmails);

});
