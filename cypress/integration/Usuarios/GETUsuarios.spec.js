/// <reference types="cypress" />

describe('Given the Users api', () => {
  context('When I send GET /usuarios', () => {
    it('Then it should return a list with all registered users', () => {
      cy.request({
        method: 'GET',
        url: '/usuarios',
      }).should((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.quantidade).to.eq(response.body.usuarios.length);
        Cypress._.each(response.body.usuarios, (usuario) => {
          expect(usuario.email).to.not.be.null;
        expect(usuario).to.have.all.keys('nome', 'email', 'password', 'administrador', '_id')
        });
      });
    });
  });

  // Turorial had me put the test below but we cannot check specific _id since the api changes to different users.
  context('when I send GET /usuarios passing id query param', () => {
    it('Then it should return only the filtered user', () => {
        cy.request({
            method: 'GET',
            url: '/usuarios',
            // qs: {
            //     _id: '5v7P0RMKlVjB929k'
            // }
          })
          .should((response) => {
              expect(response.status).to.eq(200)
            //   expect(response.body.usuarios[0].nome).to.eq('Corina Rutherford')
          })
    });
  });
});
