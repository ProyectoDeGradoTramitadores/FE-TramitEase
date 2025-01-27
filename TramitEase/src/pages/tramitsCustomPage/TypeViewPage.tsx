import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import CustomButton from '../../shared/components/buttons/CustomButton.tsx';
import { useTypeTramits } from '../../shared/hooks/useTypeTramits.ts';
import { TypeTramit } from '../../entities/TypeTramit.ts';
import TramitTypeListComponent from '../../shared/components/TypeTramitsCustom/TramitTypeListComponent.tsx';
import TypeTramitCreateView from '../../features/TypeTramit/TypeTramitCreateView.tsx';
import SearchBar from '../../shared/components/Search/SearchBar.tsx';

const TypeViewPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const { fetchTypeTramitsByTramitadorId, createNewTypeTramit } = useTypeTramits();
    const [typeTramits, setTypeTramits] = useState<TypeTramit[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>('');

    const loadTramits = async () => {
        if (id) {
            const tramitList = await fetchTypeTramitsByTramitadorId(parseInt(id));
            setTypeTramits(tramitList || []);
        }
    };

    useEffect(() => {
        loadTramits();
    }, [id]);

    const filteredTypeTramits = typeTramits.filter(typeTramit =>
        typeTramit.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleCreateClick = () => setIsCreating(true);

    const handleSaveCreate = async () => {
        try {
            const newTypeTramit: TypeTramit = { idTypeTramit: 0, idTramitador: parseInt(id ?? ''), name: newName };
            await createNewTypeTramit(newTypeTramit);
            setIsCreating(false);
            setNewName('');
            loadTramits();
        } catch (error) {
            console.error('Error creating type tramit:', error);
        }
    };

    const handleCancelCreate = () => {
        setNewName('');
        setIsCreating(false);
    };

    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                minHeight: '646px',
                minWidth: '1777px',
                padding: '30px 10px 20px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
            }}
        >
            <Typography variant="h4" component="h1" gutterBottom style={{ color: 'black' }}>
                Tipos de Trámites
            </Typography>
            <SearchBar placeholder="Buscar tipo de trámite..." onSearch={handleSearch} />
            <TramitTypeListComponent typeTramits={filteredTypeTramits} refreshList={loadTramits} />
            {isCreating && (
                <TypeTramitCreateView
                    newName={newName}
                    setNewName={setNewName}
                    handleCancelCreate={handleCancelCreate}
                    handleSaveCreate={handleSaveCreate}
                />
            )}
            {!isCreating && (
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '100px' }}>
                    <CustomButton
                        color={"ternary"}
                        $textStyle={"bold"}
                        size={"s"}
                        $text={"Crear un nuevo Tipo de Tramite"}
                        onClick={handleCreateClick}
                    />
                </div>
            )}
        </div>
    );
};

export default TypeViewPage;
