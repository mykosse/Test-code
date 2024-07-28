// Variables sélecteurs HTML
const container = document.querySelector('.container');
const nameExpenseInput = document.querySelector('.nameExpenseInput');
const costExpenseInput = document.querySelector('.costExpenseInput');
const expenseArea = document.querySelector('.expenseArea');
const totalElementP = document.querySelector('p');
const addBtn = document.querySelector('.Btn');

// Variables pour calculer 
let nbExpense = 0;
let total = 0;

const maxCharacter = 35;

const addExpense = () => {
    if (nameExpenseInput.value.length < 35) {
        let costExpense = parseFloat(costExpenseInput.value);

        if (costExpense >= 0) {
            // Créer un élément de type div qui va stocker la dépense
            const expenseDiv = document.createElement('div');
            expenseDiv.innerHTML = `${nameExpenseInput.value} : ${costExpense.toFixed(2)} € `;

            expenseDiv.oldCost = costExpense;

            const deleteBtn = document.createElement('button');

            // Styliser le bouton
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.textContent = "Supprimer";

            // Ajouter le bouton au expenseDiv
            expenseDiv.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', () => {
                deleteBtnFunction(expenseDiv);
            });

            // Augmenter le nombre de dépenses de 1
            nbExpense++;

            // Ajouter le expenseDiv au expenseArea
            expenseArea.appendChild(expenseDiv);

            // Fonction pour calculer le total des dépenses
            calculateTotal(costExpense);

            // Augmenter la taille
            growHeightContainer();

            // Fonction pour modifier le nom et le coût de la dépense
            editExpense(expenseDiv);

            // Vider les champs de saisie
            nameExpenseInput.value = "";
            costExpenseInput.value = "";
        } else {
            alert("Votre prix ne peut pas être négatif !");
        }

    } else {
        alert("Le nom de votre dépense est trop long !");
    }
};

const calculateTotal = (costExpense) => {
    total += costExpense;
    totalElementP.textContent = `${total.toFixed(2)} €`;
};

const growHeightContainer = () => {
    const initialHeight = 350;
    const newHeight = initialHeight + (nbExpense * 25);

    // Mettre à jour la taille du container
    container.style.height = newHeight + "px";
};

const reduceHeightContainer = () => {
    const computedStyle = getComputedStyle(container);
    const currentHeight = parseFloat(computedStyle.height);
    const newHeight = currentHeight - 25;

    container.style.height = newHeight + "px";
};

const editExpense = (expenseDiv) => {
    expenseDiv.addEventListener('dblclick', () => {
        // Récupérer le nouveau nom et le nouveau prix
        const newExpenseName = prompt("Entrez le nouveau nom de la dépense");
        const newExpenseCost = parseFloat(prompt("Entrez le nouveau prix de la dépense"));

        if (newExpenseName.trim() !== "" && !isNaN(newExpenseCost) && newExpenseCost >= 0) {
            total -= expenseDiv.oldCost;
            total += newExpenseCost;
            totalElementP.innerHTML = `${total.toFixed(2)} €`;

            // Mettre à jour le contenu de expenseDiv
            expenseDiv.innerHTML = `${newExpenseName} : ${newExpenseCost.toFixed(2)} €`;

            // Mettre à jour oldCost
            expenseDiv.oldCost = newExpenseCost;

            // Réajouter le bouton de suppression
            const deleteBtn = document.createElement('button');
            // Styliser le bouton
            deleteBtn.classList.add("deleteBtn");
            deleteBtn.textContent = "Supprimer";
            // Réajouter le bouton
            expenseDiv.appendChild(deleteBtn);

            deleteBtn.addEventListener('click', () => {
                deleteBtnFunction(expenseDiv);
            });
        }
    });
};

const deleteBtnFunction = (expenseDiv) => {
    const costExpense = expenseDiv.oldCost;
    expenseDiv.remove();
    nbExpense--;
    calculateTotal(-costExpense);
    reduceHeightContainer();
};

addBtn.addEventListener('click', () => {
    if (nameExpenseInput.value.trim() !== "" && costExpenseInput.value.trim() !== "") {
        addExpense();
    } else {
        alert("Veuillez renseigner les champs avec des informations valides");
    }
});



