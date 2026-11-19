/**
 * Galerie Yandé - Gestionnaire des Œuvres (Ngor Diouf)
 * Permet à l'artiste d'ajouter, modifier et supprimer ses œuvres sans toucher au code.
 */

const DEFAULT_ARTWORKS = [
    {
        id: "art-1",
        title: "Regard d'Afrique",
        artist: "Ngor Diouf",
        collection: "Visages & Portraits",
        status: "disponible",
        technique: "Acrylique sur toile",
        dimensions: "80 x 100 cm",
        year: "2026",
        image: "images/Regard d'Afrique.jpeg",
        description: "Une exploration poétique des expressions du visage et de l'âme africaine. Les textures riches et les contrastes subtils invitent le spectateur à plonger dans l'histoire de ce regard perçant."
    },
    {
        id: "art-2",
        title: "Harmonie",
        artist: "Ngor Diouf",
        collection: "Femmes d'Afrique",
        status: "vendue",
        technique: "Acrylique et techniques mixtes",
        dimensions: "90 x 90 cm",
        year: "2026",
        image: "images/WhatsApp Image 2026-10-10 at 18.20.07.jpeg",
        description: "Célébration de la grâce, de la beauté et de la résilience féminine à travers une palette harmonieuse et chaleureuse."
    },
    {
        id: "art-3",
        title: "Sourire d'Enfance",
        artist: "Ngor Diouf",
        collection: "Enfance & Joie",
        status: "disponible",
        technique: "Acrylique sur toile",
        dimensions: "70 x 90 cm",
        year: "2026",
        image: "images/Sourire d'Enfance.jpeg",
        description: "L'innocence et la joie pure capturées dans un éclat de lumière et d'émotions sincères."
    },
    {
        id: "art-4",
        title: "Fierté Silencieuse",
        artist: "Ngor Diouf",
        collection: "Visages & Portraits",
        status: "disponible",
        technique: "Acrylique sur toile",
        dimensions: "80 x 100 cm",
        year: "2026",
        image: "images/FIERTE SILENCIEUSE",
        description: "Un hommage à la dignité et à la force intérieure qui s'exprime dans le silence du regard."
    },
    {
        id: "art-5",
        title: "Gouye Gui (Le Baobab)",
        artist: "Ngor Diouf",
        collection: "Nature & Héritage",
        status: "disponible",
        technique: "Technique mixte sur toile",
        dimensions: "100 x 120 cm",
        year: "2026",
        image: "images/GOUYE GUI",
        description: "Symbole sacré de longévité, de sagesse et d'enracinement dans la terre ancestrale."
    },
    {
        id: "art-6",
        title: "Vitamin Watermelon",
        artist: "Ngor Diouf",
        collection: "Couleurs & Émotions",
        status: "disponible",
        technique: "Acrylique vibrante",
        dimensions: "80 x 80 cm",
        year: "2026",
        image: "images/VITAMIN WATERMELON",
        description: "Explosion de fraîcheur, d'énergie et de couleurs vives invitant à la célébration du quotidien."
    }
];

const STORAGE_KEY = 'galerie_yande_artworks_v1';
const ADMIN_PASS_KEY = 'galerie_yande_admin_pass';
const DEFAULT_PASS = 'ngor2026';

// Récupérer toutes les œuvres
function getArtworks() {
    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        }
    } catch (e) {
        console.error("Erreur lecture localStorage:", e);
    }
    // Si rien n'est stocké, initialiser avec la collection de base
    saveArtworks(DEFAULT_ARTWORKS);
    return DEFAULT_ARTWORKS;
}

// Sauvegarder les œuvres
function saveArtworks(artworks) {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(artworks));
        return true;
    } catch (e) {
        console.error("Erreur sauvegarde localStorage:", e);
        return false;
    }
}

// Récupérer une œuvre par son ID
function getArtworkById(id) {
    const list = getArtworks();
    return list.find(item => item.id === id) || null;
}

// Ajouter une nouvelle œuvre
function addArtwork(data) {
    const list = getArtworks();
    const newArtwork = {
        id: 'art-' + Date.now(),
        title: data.title || 'Sans titre',
        artist: 'Ngor Diouf',
        collection: data.collection || 'Autres',
        status: data.status || 'disponible',
        technique: data.technique || 'Acrylique sur toile',
        dimensions: data.dimensions || '',
        year: data.year || new Date().getFullYear().toString(),
        image: data.image || 'images/logo.jpeg',
        description: data.description || ''
    };
    list.unshift(newArtwork); // Ajoute en premier pour qu'elle soit en tête d'affiche
    saveArtworks(list);
    return newArtwork;
}

// Mettre à jour une œuvre
function updateArtwork(id, updatedFields) {
    const list = getArtworks();
    const index = list.findIndex(item => item.id === id);
    if (index !== -1) {
        list[index] = { ...list[index], ...updatedFields };
        saveArtworks(list);
        return list[index];
    }
    return null;
}

// Supprimer une œuvre
function deleteArtwork(id) {
    let list = getArtworks();
    list = list.filter(item => item.id !== id);
    saveArtworks(list);
    return list;
}

// Réinitialiser les œuvres
function resetArtworks() {
    saveArtworks(DEFAULT_ARTWORKS);
    return DEFAULT_ARTWORKS;
}

// Compresser une image (pour éviter de saturer le localStorage et charger super vite)
function compressImage(file, maxWidth = 1200, maxHeight = 1200, quality = 0.82) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                let width = img.width;
                let height = img.height;

                if (width > height) {
                    if (width > maxWidth) {
                        height = Math.round((height * maxWidth) / width);
                        width = maxWidth;
                    }
                } else {
                    if (height > maxHeight) {
                        width = Math.round((width * maxHeight) / height);
                        height = maxHeight;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);
                const compressedBase64 = canvas.toDataURL('image/jpeg', quality);
                resolve(compressedBase64);
            };
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Gestion mot de passe artiste
function getAdminPassword() {
    return localStorage.getItem(ADMIN_PASS_KEY) || DEFAULT_PASS;
}

function setAdminPassword(newPass) {
    localStorage.setItem(ADMIN_PASS_KEY, newPass);
}

function isAdminLoggedIn() {
    return sessionStorage.getItem('ngor_artist_logged') === 'true';
}

function loginAdmin(pass) {
    if (pass === getAdminPassword()) {
        sessionStorage.setItem('ngor_artist_logged', 'true');
        return true;
    }
    return false;
}

function logoutAdmin() {
    sessionStorage.removeItem('ngor_artist_logged');
}

